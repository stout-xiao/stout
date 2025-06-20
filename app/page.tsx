'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div style={{ maxWidth: 600, margin: '50px auto', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <Image src="/su-xin.png" alt="苏忻" width={120} height={120} style={{ borderRadius: '50%' }} />
      <h1 style={{ fontSize: '2rem', marginTop: 20 }}>🐑 苏忻 · 小羊聊天机器人</h1>
      <p style={{ marginTop: 10, color: '#666' }}>
        一个幽默风趣、搞怪吐槽、略带阴阳的小羊 AI。
      </p>
      <p style={{ marginTop: 10, color: '#666' }}>
        准备好跟苏忻闲聊一波了吗？
      </p>
      <button
        onClick={() => router.push('/home')}
        style={{
          marginTop: 30,
          padding: '15px 40px',
          fontSize: '1.2rem',
          borderRadius: '10px',
          backgroundColor: '#ff69b4',
          color: '#fff',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        进入苏忻的世界 🚀
      </button>
    </div>
  );
}
