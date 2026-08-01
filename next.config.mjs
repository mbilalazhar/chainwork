/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        // Temporary (307) on purpose: a permanent redirect gets hard-cached by
        // browsers and would be painful to undo once "/" becomes a dashboard.
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
