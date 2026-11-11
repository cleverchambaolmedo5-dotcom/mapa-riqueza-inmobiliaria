/**
 * Registros de "El Mapa de la Riqueza Inmobiliaria" → Google Sheets.
 *
 * Pegar este archivo en Extensiones → Apps Script de la hoja de cálculo y
 * publicarlo como aplicación web (ver README.md en esta misma carpeta).
 *
 * IMPORTANTE: reemplaza SECRET por la misma clave que pongas en la variable
 * de entorno GOOGLE_SHEETS_WEBHOOK_SECRET de la landing.
 */

var SECRET = 'REEMPLAZAR_POR_TU_CLAVE_SECRETA';
var SHEET_NAME = 'Registros';
var TIME_ZONE = 'America/Guayaquil';

var HEADERS = [
  'Fecha (Ecuador)',
  'Nombre',
  'WhatsApp',
  'Correo',
  'País',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'Página',
  'Referente',
  'Duplicado',
  'Navegador',
];

// Columnas (1-indexadas) usadas para detectar registros repetidos.
var COL_WHATSAPP = 3;
var COL_EMAIL = 4;

function doPost(e) {
  var data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return respond({ ok: false, error: 'json_invalido' });
  }

  if (!data || data.secret !== SECRET) {
    return respond({ ok: false, error: 'no_autorizado' });
  }

  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000); // evita filas pisadas si llegan registros a la vez
  } catch (err) {
    return respond({ ok: false, error: 'ocupado' });
  }

  try {
    var sheet = getSheet();
    var email = clean(data.email).toLowerCase();
    var whatsapp = clean(data.whatsapp);

    var row = [
      Utilities.formatDate(new Date(), TIME_ZONE, 'yyyy-MM-dd HH:mm:ss'),
      clean(data.fullName),
      whatsapp,
      email,
      clean(data.country),
      clean(data.utmSource),
      clean(data.utmMedium),
      clean(data.utmCampaign),
      clean(data.utmContent),
      clean(data.utmTerm),
      clean(data.page),
      clean(data.referrer),
      isDuplicate(sheet, whatsapp, email) ? 'Sí' : '',
      clean(data.userAgent),
    ].map(asText);

    sheet.appendRow(row);
    return respond({ ok: true });
  } catch (err) {
    return respond({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** Crea la pestaña y la fila de encabezados la primera vez. */
function getSheet() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#1764FF').setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/** ¿Ya existe un registro con el mismo WhatsApp o correo? */
function isDuplicate(sheet, whatsapp, email) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;
  var values = sheet.getRange(2, COL_WHATSAPP, lastRow - 1, 2).getDisplayValues();
  for (var i = 0; i < values.length; i++) {
    if ((whatsapp && values[i][0] === whatsapp) || (email && values[i][1].toLowerCase() === email)) {
      return true;
    }
  }
  return false;
}

function clean(value) {
  return value === undefined || value === null ? '' : String(value).trim().slice(0, 500);
}

/**
 * Fuerza texto: evita que "+593…" se convierta en número y que un valor que
 * empiece por = + - @ se ejecute como fórmula (inyección en hojas de cálculo).
 */
function asText(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function respond(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
