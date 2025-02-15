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
- 🌍 Globo interativo 3D com:
  - Localização do usuário em tempo real
  - Conexões globais animadas
  - Efeitos de iluminação realistas
  - Textura de alta resolução
  - Atmosfera dinâmica
  - Rotação automática suave
- 🛰️ Radar meteorológico em tempo real:
  - Visualização de precipitação
  - Animação temporal do radar
  - Controles de reprodução
  - Múltiplas camadas de mapa
  - Zoom automático para localização

## 🚀 Tecnologias

- [Next.js 14](https://nextjs.org/)
- [React 18](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Meteoblue API](https://www.meteoblue.com/)
- [Three.js](https://threejs.org/)
- [React-Globe.GL](https://github.com/vasturiano/react-globe.gl)
- [Leaflet](https://leafletjs.com/)
- [RainViewer API](https://www.rainviewer.com/)

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
- [RainViewer](https://www.rainviewer.com/) pela API do radar meteorológico

## 🌍 Globo Interativo

O aplicativo inclui um globo terrestre 3D interativo com recursos avançados:
- Visualização da localização do usuário em tempo real
- Conexões globais animadas com efeito de brilho
- Textura realista da Terra em alta resolução
- Efeitos de relevo e topografia
- Atmosfera dinâmica com gradiente de cores
- Iluminação realista com reflexos nos oceanos
- Rotação automática suave
- Interatividade com zoom e rotação
- Marcador personalizado para localização atual

## 🛰️ Radar Meteorológico

O aplicativo oferece um radar meteorológico interativo com recursos avançados:
- Visualização em tempo real da precipitação
- Animação temporal com controles de reprodução (play/pause/avançar/retroceder)
- Múltiplas camadas de mapa:
  - Mapa padrão
  - Visualização por satélite
  - Satélite com rótulos
- Zoom automático para a localização do usuário
- Atualização automática a cada 5 minutos
- Interface intuitiva com controles de tempo
- Marcador de localização atual
- Escala de tempo com horários