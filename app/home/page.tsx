'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface Message {
  role: string;
  content: string;
}

const ACCESS_PASSWORD = 'su-xin-2025';  // 你设定的访问密码（自己改成你想要的）

export default function Home() {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handlePasswordSubmit = () => {
    if (password === ACCESS_PASSWORD) {
      setAuthorized(true);
    } else {
      alert('密码错误！');
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages }),
    });

    if (!res.ok) {
      setLoading(false);
      alert('出错了，苏忻罢工了！');
      return;
    }

    const data = await res.json();
    const reply = data.choices[0].message;

    // 模拟打字效果
    let displayContent = '';
    const fullReply = reply.content;
    for (let i = 0; i < fullReply.length; i++) {
      displayContent += fullReply[i];
      setMessages([...newMessages, { role: 'assistant', content: displayContent }]);
      await new Promise(r => setTimeout(r, 20));
    }

    setLoading(false);
  };

  if (!authorized) {
    return (
      <div style={{ maxWidth: 400, margin: '100px auto', textAlign: 'center' }}>
        <h2>🐑 苏忻聊天机器人</h2>
        <p>请输入访问密码：</p>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ padding: 10, width: '80%' }}
        />
        <div style={{ marginTop: 10 }}>
          <button onClick={handlePasswordSubmit} style={{ padding: '8px 20px' }}>进入</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: '30px auto', fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <Image src="/su-xin.png" alt="苏忻" width={80} height={80} style={{ borderRadius: '50%' }} />
        <h1>🐑 苏忻 · 小羊聊天机器人</h1>
      </div>

      <div
        ref={chatContainerRef}
        style={{
          border: '1px solid #ccc',
          borderRadius: 10,
          padding: 15,
          minHeight: 300,
          background: '#f9f9f9',
          marginBottom: 15,
          overflowY: 'auto',
          maxHeight: 500
        }}
      >
        {messages.map((m, idx) => (
          <div key={idx} style={{ marginBottom: 10 }}>
            <b style={{ color: m.role === 'user' ? '#333' : '#ff69b4' }}>
              {m.role === 'user' ? '你：' : '苏忻：'}
            </b>
            <span>{m.content}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex' }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          style={{ flexGrow: 1, padding: 10, fontSize: 16 }}
          disabled={loading}
          placeholder="跟苏忻聊点什么..."
          onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
        />
        <button onClick={sendMessage} disabled={loading} style={{ marginLeft: 10, padding: '0 20px', fontSize: 16 }}>
          {loading ? '苏忻思考中...' : '发送'}
        </button>
      </div>
    </div>
  );
}
