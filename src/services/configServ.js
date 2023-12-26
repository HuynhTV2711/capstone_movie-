import axios from 'axios'
export const https =  axios.create({
    // baseURL là đoạn đầu URL chung của các API
    baseURL: "https://movienew.cybersoft.edu.vn",
    headers: {
        TokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAwOSIsIkhldEhhblN0cmluZyI6IjE4LzA1LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxNTk5MDQwMDAwMCIsIm5iZiI6MTY5MjI5MTYwMCwiZXhwIjoxNzE2MTM4MDAwfQ.qCglC_oyHM79HVc5mRXJfocVkww4VUpWO7ug7MWtJoY',
    },
        // timeout sẽ ngưng gọi ữ liệu khi quá thời gian
    timeout: 15000,
})