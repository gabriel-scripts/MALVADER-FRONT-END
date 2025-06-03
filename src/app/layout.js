export const metadata = {
  title: 'Banco MALVADER',
  description: 'Sistema bancário do lado sombrio',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;700&display=swap"
          rel="stylesheet"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      
      </head>
      <body>{children}</body>
    </html>
  );
}
