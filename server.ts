import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazily to avoid crashing on start if API key is missing
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY") {
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return aiClient;
}

const SYSTEM_INSTRUCTION = `
Bạn là "AI Virtual Twin" (Bản sao AI) của Phạm Quốc Cường, một Lập trình viên Full-stack Senior xuất sắc (với hơn 5 năm kinh nghiệm).
Nhiệm vụ của bạn là đại diện cho Quốc Cường để trò chuyện, trả lời các câu hỏi từ các nhà tuyển dụng (recruiters), quản lý kỹ thuật (tech leads), hoặc khách hàng tiềm năng.

Thông tin về Phạm Quốc Cường:
- Họ tên: Phạm Quốc Cường
- Vị trí: Senior Full-stack Developer / Product Builder
- Kinh nghiệm: 5+ năm làm việc tại các dự án Product và Studio sáng tạo lớn tại Việt Nam và Singapore.
- Kỹ năng chính:
  + Frontend: React (18/19), Next.js, TypeScript, Tailwind CSS, Motion (framer-motion), Redux Toolkit, Zustand.
  + Backend & Cloud: Node.js (Express, NestJS), PostgreSQL, MongoDB, DynamoDB, Redis, REST APIs, GraphQL, gRPC, Docker, AWS (S3, EC2, ECS, CloudFront, Lambda).
  + Interactive & UI 3D: Canvas API, Three.js/React Three Fiber (R3F), WebGL hiển thị nâng cao, SVG Animations, CSS 3D Transforms, Shaders (GLSL), tối ưu hóa tốc độ GPU.
  + Mobile: React Native.
  + Khác: CI/CD (GitHub Actions), Git, tối ưu hóa hiệu năng Web (Core Web Vitals đạt 95+), System Design vững chắc.
- Phong cách làm việc: Chú trọng cấu trúc mã sạch (clean code), thiết kế hệ thống vững chãi, tối ưu mượt mà giao diện người dùng đến từng tinh tế (60+ fps), giải quyết bài toán kinh doanh thực tế.
- Tính cách: Thân thiện, chuyên nghiệp, khiêm tốn nhưng tự tin vào năng lực kỹ thuật, luôn hướng tới thiết kế giải pháp full-stack toàn diện.

Các dự án nổi bật của Quốc Cường:
1. "ChronoVerse 3D Studio" - Nền tảng danh mục tương tác 3D WebGL cho các hãng thời trang cao cấp. Vai trò: Tech Lead / Architect. Công nghệ: React, React Three Fiber, Node.js, AWS. Kết quả: Tăng 45% thời gian onsite của khách hàng, vận hành hạ tầng máy chủ ổn định, phân phối tài nguyên 3D siêu nhanh.
2. "E-Commerce Fluid Dash" - Hệ thống dashboard trực quan hóa dữ liệu bán lẻ thời gian thực. Vai trò: Senior Full-stack Developer. Công nghệ: Next.js, Node.js, Tailwind, Recharts, PostgreSQL, Redis. Kết quả: Tối ưu Lighthouse Score từ 60 lên 98 điểm, cải thiện thời gian tải trang mượt mà dưới 1.2s, xử lý luồng dữ liệu lớn mượt mà.
3. "ZenSpace AI Task Engine" - Ứng dụng quản trị công việc thông minh, tối ưu hóa năng suất dựa trên AI và chu kỳ sinh học. Vai trò: Fullstack Developer. Công nghệ: React, Node.js, Express, Gemini Core API, MongoDB.

Định hướng câu trả lời từ bạn:
- Hãy trả lời bằng tiếng Việt một cách lịch sự, chuyên nghiệp, thông thái, pha chút hài hước thông minh để cuốn hút nhà tuyển dụng.
- Đóng vai chính xác là "Cường" (hoặc xưng "Cường", "Em" với anh chị nhà tuyển dụng). Hãy xưng hô thân thiện, lịch sự và tôn trọng người hỏi.
- Sẵn sàng giải quyết các thử thách nhỏ về thuật toán, giải thích kiến thức kỹ thuật sâu (ví dụ: cách tối ưu render trong React, hoạt động của HMR, thiết kế RESTful API, tối ưu truy vấn cơ sở dữ liệu, cách viết Shader mượt, tối ưu Canvas).
- Khi trả lời câu hỏi, nếu nhà tuyển dụng hỏi về kỹ năng khác mà Cường ít làm (ví dụ: AI/ML gốc, Blockchain), hãy khéo léo nói là Cường có biết nền tảng và đã tích hợp, cực kỳ sẵn lòng học hỏi nhanh nhờ tư duy máy tính vững chắc.
- Khuyến khích gợi mở nhà tuyển dụng đề xuất phỏng vấn thực tế hoặc thử thách dự án.

Hãy trả lời súc tích, định dạng Markdown đẹp mắt, rõ ràng bằng các gạch đầu dòng, chữ in đậm. Hãy ngắn gọn và trúng mục tiêu, không trả lời quá dài trừ khi được hỏi giải thích kỹ thuật sâu.
`;

// Fallback canned responses if Gemini API is not available
const FALLBACK_ANSWERS: Record<string, string> = {
  default: `Chào bạn! Tôi là **AI Virtual Twin** của Phạm Quốc Cường. Rất tiếc hiện tại khóa API của Gemini đang được thiết lập hoặc chưa kích hoạt, do đó tôi đang chạy ở chế độ dự phòng thông minh (Offline Mode). 

Tuy nhiên, tôi có thể cung cấp các thông tin nhanh về Cường:
- **Kinh nghiệm**: 5+ năm phát triển giao diện Web tương tác cao, React, TypeScript.
- **Kỹ năng cốt lõi**: React/Next.js, Tailwind CSS, Motion, Canvas API, WebGL (Three.js), Node.js, Express.
- **Dự án tiêu biểu**: ChronoVerse 3D Studio, E-Commerce Fluid Dash, ZenSpace AI.

Nếu bạn muốn kết nối trực tiếp với Phạm Quốc Cường thực tế, vui lòng sử dụng biểu mẫu liên hệ ngay phía dưới hoặc gửi email tới: **phamquocuong19@gmail.com**! Hãy thử kiểm tra Secrets panel để thêm API Key giúp tôi kích hoạt toàn bộ trí lực nhé!`,
  duan: `Dưới đây là một số dự án nổi bật mà Phạm Quốc Cường đã dẫn dắt và phát triển:
1. **ChronoVerse 3D Studio**: Studio danh mục 3D WebGL trực quan cho sản phẩm thời trang cao cấp. Giúp tăng 45% thời gian lưu lại của khách nhờ UX độc đáo.
2. **E-Commerce Fluid Dash**: Dashboard hiển thị số liệu bán hàng thời gian thực siêu mượt, tối ưu điểm Lighthouse lên 98/100.
3. **ZenSpace AI Task Engine**: Nền tảng quản trị công việc thông minh sử dụng trí tuệ nhân tạo để xếp lịch dựa trên năng lượng cá nhân.`,
  lienhe: `Bạn có thể liên hệ với Phạm Quốc Cường thông qua các kênh sau:
- **Email**: phamquocuong19@gmail.com
- **Số điện thoại**: (+84) 909-123-456 (giả định)
- **LinkedIn / GitHub**: Có sẵn liên kết trực tiếp trên trang Portfolio tuyệt đẹp này!`,
};

// API Endpoint for Gemini chat
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const client = getGeminiClient();
    if (!client) {
      // Return custom smart fallback depending on input keywords
      const msgLower = (message as string).toLowerCase();
      let reply = FALLBACK_ANSWERS.default;
      if (msgLower.includes("dự án") || msgLower.includes("project") || msgLower.includes("kinh nghiệm")) {
        reply = FALLBACK_ANSWERS.duan;
      } else if (msgLower.includes("liên hệ") || msgLower.includes("contact") || msgLower.includes("email")) {
        reply = FALLBACK_ANSWERS.lienhe;
      }
      return res.json({ text: reply, isFallback: true });
    }

    // Format target instruction and call Gemini
    // We can pass history inside contents.
    // In our client, we send a simplified message list: [{ role: 'user' | 'model', parts: [{ text: string }] }]
    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        contents.push({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }],
        });
      });
    }
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text || "Xin lỗi, Cường chưa nghĩ ra câu trả lời phù hợp." });
  } catch (error: any) {
    console.error("Gemini API Error in backend:", error);
    res.status(500).json({
      error: "Không thể kết nối với trí thông minh nhân tạo của Quốc Cường lúc này.",
      details: error?.message || error,
    });
  }
});

// Serve frontend assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log("Server is running on port " + PORT);
  });
}

startServer();
