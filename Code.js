/**
 * TODO: Thay YOUR_SHEET_ID bằng ID của Google Spreadsheet để lưu dữ liệu form
 */
const SHEET_ID = '1huIaapFu4zrGgozC7xs438cGl5-63PcxxPT3gBPv3TE';

/**
 * Hàm serve giao diện
 */
function doGet(e) {
  const template = HtmlService.createTemplateFromFile('index');
  // Lấy ảnh calligraphy từ Drive dưới dạng Base64
  const fileId = '1jnz9FEy4hLEn7bHiu_iAUzZLOzgaXqIB';
  try {
    const blob = DriveApp.getFileById(fileId).getBlob();
    template.imageBase64 = Utilities.base64Encode(blob.getBytes());
  } catch (err) {
    template.imageBase64 = ''; // nếu lỗi, để trống
  }
  return template.evaluate()
    .setTitle('RSVP Đám Cưới');
}

/**
 * Hàm xử lý form
 */
function processForm(data) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getActiveSheet();
  // Xác định có tham dự hay không
  const attendance = data.attendance ? 'Có' : 'Không';
  sheet.appendRow([
    new Date(),
    data.name,
    data.guests,
    attendance
  ]);
  return 'success';
} 