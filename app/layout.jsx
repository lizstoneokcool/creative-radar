import './globals.css'

export const metadata = {
  title: 'Creative Radar — Daily Curation Dashboard',
  description: 'The best creative content on the internet, curated daily for your team.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,300;6..72,400;6..72,600&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
