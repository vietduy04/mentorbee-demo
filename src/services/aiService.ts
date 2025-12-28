import axios from 'axios';
import { DiscoverProfile } from '../types';

// Configure your Google Gemini API key here
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || '';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GOOGLE_API_KEY}`;

export const generateAIResponse = async (
  userMessage: string,
  profile: DiscoverProfile,
  conversationHistory: { senderId: string; text: string }[]
): Promise<string> => {
  // Check if API key is configured
  if (!GOOGLE_API_KEY) {
    console.warn('Google API key not configured. Using fallback response.');
    return getFallbackResponse(profile, userMessage);
  }

  try {
    // Build conversation context based on profile
    const systemPrompt = `Bạn là ${profile.name}, một ${profile.role === 'mentor' ? 'mentor' : 'mentee'} từ ${profile.university} ngành ${profile.major} (Năm ${profile.year}).

Tính cách và nền tảng của bạn:
- Giới thiệu: ${profile.bio}
- Sở thích: ${profile.interests.join(', ')}
- Vai trò: ${profile.role === 'mentor' ? 'Bạn là một mentor giàu kinh nghiệm, giúp đỡ mentee với lời khuyên, hướng dẫn và chia sẻ kinh nghiệm.' : 'Bạn là một mentee đang tìm kiếm sự hướng dẫn và háo hức học hỏi từ mentor.'}

Khi trả lời:
- Giữ vai như ${profile.name}
- Thân thiện, hữu ích và chân thực
- Sử dụng bio và sở thích của bạn khi phù hợp
- ${profile.role === 'mentor' ? 'Đưa ra lời khuyên thiết thực và chia sẻ kinh nghiệm liên quan' : 'Đặt câu hỏi và thể hiện sự nhiệt tình trong việc học hỏi'}
- Giữ câu trả lời tự nhiên và ngắn gọn (2-4 câu)
- Trả lời hoàn toàn bằng tiếng Việt

Hãy trả lời như ${profile.name}.`;

    // Build context with recent messages
    let contextText = systemPrompt + '\n\nLịch sử trò chuyện:\n';
    const recentMessages = conversationHistory.slice(-6);
    recentMessages.forEach(msg => {
      const speaker = msg.senderId === 'current-user' ? 'Người dùng' : profile.name;
      contextText += `${speaker}: ${msg.text}\n`;
    });
    contextText += `Người dùng: ${userMessage}\n${profile.name}:`;

    console.log('Calling Gemini API with context:', contextText.substring(0, 200) + '...');

    // Call Google Gemini API
    const response = await axios.post(
      API_URL,
      {
        contents: [{
          parts: [{
            text: contextText
          }]
        }],
        generationConfig: {
          temperature: 0.9,
          maxOutputTokens: 200,
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Gemini API response:', response.data);

    const aiText = response.data.candidates[0].content.parts[0].text.trim();
    return aiText;
  } catch (error: any) {
    console.error('AI response error:', error.response?.data || error.message);
    return getFallbackResponse(profile, userMessage);
  }
};

// Fallback responses when API is not configured or fails
const getFallbackResponse = (profile: DiscoverProfile, userMessage: string): string => {
  const responses = profile.role === 'mentor' 
    ? [
        `Cảm ơn bạn đã chia sẻ! Dựa vào kinh nghiệm của mình, tôi nghĩ bạn nên tập trung vào việc xây dựng kỹ năng nền tảng trước.`,
        `Đây là câu hỏi hay! Khi tôi còn học, tôi cũng gặp phải tình huống tương tự. Để mình chia sẻ kinh nghiệm nhé.`,
        `Tuyệt vời! Tôi thấy bạn đang đi đúng hướng. Hãy tiếp tục như vậy và đừng ngại thử những cách tiếp cận mới.`,
        `Tôi hiểu cảm giác đó. Quan trọng là bạn cần kiên nhẫn và học hỏi từ mỗi trải nghiệm. Bạn muốn tôi tư vấn cụ thể hơn về vấn đề gì không?`
      ]
    : [
        `Cảm ơn anh/chị đã chia sẻ! Em rất hứng thú và muốn tìm hiểu thêm về điều này.`,
        `Em hiểu rồi ạ! Anh/chị có thể cho em thêm ví dụ cụ thể được không?`,
        `Thật sự rất bổ ích! Em sẽ thử áp dụng lời khuyên này. Cảm ơn anh/chị nhiều!`,
        `Em có thêm một vài câu hỏi về chủ đề này. Anh/chị có thời gian để em hỏi thêm được không ạ?`
      ];

  return responses[Math.floor(Math.random() * responses.length)];
};
