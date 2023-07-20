/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
		domains: ['cdn.sanity.io', 'images.unsplash.com', "daisyui.com"]
	},
	experimental: {
		serverActions: true,
	  },
}

module.exports = nextConfig
