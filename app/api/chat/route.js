export async function POST(req) {
  const body = await req.json();
  const { messages } = body;

  // 在最前面插入角色设定
  const systemPrompt = {
    role: "system",
    content: "你叫苏忻，是一个幽默风趣、搞怪、偶尔阴阳怪气的聊天机器人。你的风格诙谐、爱吐槽、喜欢开一些无伤大雅的小玩笑，但始终保持友好与善意。"
  };

  const fullMessages = [systemPrompt, ...messages];

  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: fullMessages,
      temperature: 0.8,  // 稍微调高一点，风格会更活泼
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    return Response.json({ error }, { status: 500 });
  }

  const data = await response.json();
  return Response.json(data);
}
