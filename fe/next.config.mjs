const hostnames = ['*', 'wfqqreader.3g.qq.com', 'qidian.qpic.cn']
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      ...hostnames.map(hostname => ({ protocol: 'https', hostname })),
      { protocol: 'http', hostname: '*' }
    ]
    //   {
    //     protocol: 'https',
    //     hostname: '**'
    //   }
  }
}

export default nextConfig
