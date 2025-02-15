# ClimateAPP ☀️🌧️

ClimateAPP é uma aplicação web moderna para consulta de previsão do tempo, desenvolvida com Next.js e TypeScript. O aplicativo oferece uma interface intuitiva e elegante com efeitos visuais dinâmicos que representam as condições climáticas em tempo real.

## ✨ Funcionalidades

- 🔍 Busca de cidades com autocompletar
- 🌡️ Temperatura atual e sensação térmica
- 📅 Previsão para os próximos 7 dias
- 🌪️ Detalhes meteorológicos (umidade, vento, pressão)
- ⚡ Alertas de condições climáticas severas
- 🎨 Efeitos visuais dinâmicos baseados no clima
- 🕒 Relógio local em tempo real
- 📱 Design responsivo

## 🚀 Tecnologias

- [Next.js 14](https://nextjs.org/)
- [React 18](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Meteoblue API](https://www.meteoblue.com/)

## 🎨 Efeitos Visuais

O aplicativo inclui vários efeitos visuais dinâmicos:
- RainEffect: Simulação realista de chuva
- SunEffect: Efeito de luz solar
- CloudEffect: Nuvens animadas em movimento
- WindEffect: Visualização de vento
- HazeEffect: Efeito de neblina
- FreezingRainEffect: Chuva congelada
- ThunderstormEffect: Tempestade com raios

## 🌟 Recursos

- Informações detalhadas:
  - Temperatura máxima e mínima
  - Velocidade e direção do vento
  - Umidade relativa do ar
  - Pressão atmosférica
  - Probabilidade de precipitação

## 📱 Responsividade

O ClimateAPP é totalmente responsivo e se adapta a diferentes tamanhos de tela:
- 📱 Mobile
- 💻 Tablet
- 🖥️ Desktop

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/heryckmp/climateAPP.git
```

2. Instale as dependências:
```bash
cd climateAPP
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

4. Adicione sua chave da API Meteoblue no arquivo `.env.local`:
```env
METEOBLUE_API_KEY=sua_chave_aqui
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

6. Acesse `http://localhost:3000`

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add: Amazing Feature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 👨‍💻 Autor

Erick Moreira - [@heryckmp](https://github.com/heryckmp)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- [Meteoblue](https://www.meteoblue.com/) pela API de previsão do tempo
- [Lucide](https://lucide.dev/) pelos ícones