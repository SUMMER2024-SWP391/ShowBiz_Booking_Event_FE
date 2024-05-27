const getGoogleAuthUrl = (): string => {
  const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_REDIRECT_URI } = import.meta.env
  const url = 'https://accounts.google.com/o/oauth2/v2/auth'
  const query = {
    client_id: VITE_GOOGLE_CLIENT_ID,
    redirect_uri: VITE_GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ].join(' '), //các quyền truy cập, và chuyển thành chuỗi cách nhau bằng space
    prompt: 'consent', //nhắc người dùng đồng ý cho phép truy cập
    access_type: 'offline' //truy cập offline giúp lấy thêm refresh token
  }
  return `${url}?${new URLSearchParams(query)}` //URLSearchParams(hàm có sẵn): tạo ra chuỗi query dạng key=value&key=value để làm query string
}

export const googleAuthUrl = getGoogleAuthUrl()
