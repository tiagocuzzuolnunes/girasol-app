export default {
    entry: './src/index.jsx',  // Certifique-se de apontar para o arquivo certo
    outdir: './dist',
    jsx: 'react',  // Certifica que o Bun entenda JSX corretamente
    server: {
        port: 8000,  // Tente outra porta
    },
};
