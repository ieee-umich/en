Student (浏览器)
      │
      │ 1. 点击 "登录" 按钮
      ▼
Your Website
      │
      │ 2. Redirect → UM InCommon / Shibboleth Login Page
      ▼
UM Login Page
      │
      │ 3. 学生输入校园账号和密码
      ▼
Authorization Server (UM OAuth2)
      │
      │ 4. 登录成功 → Redirect Back to Your Website
      │    URL 带上 Authorization Code
      ▼
Your Web Server (后端)
      │
      │ 5. 用 Authorization Code 请求 Access Token
      │    POST https://gw.api.it.umich.edu/um/oauth2/token
      │    grant_type=authorization_code
      │    client_id, client_secret
      │    code=<auth_code>
      ▼
OAuth2 Access Token
      │
      │ 6. 用 Access Token 调用 Person API
      │    GET https://gw.api.it.umich.edu/um/person/v1/person/<student_id>
      │    Header: Authorization: Bearer <access_token>
      ▼
Person API Response
      │
      │ 7. 返回 JSON，包括：
      │    {
      │       "uniqname": "jsmith",
      │       "firstName": "John",
      │       "lastName": "Smith",
      │       ...
      │    }
      ▼
Your Web Server
      │
      │ 8. 用 uniqname 做匹配或业务逻辑
      ▼
Student (浏览器)
      │
      │ 9. 展示定制化内容
      ▼