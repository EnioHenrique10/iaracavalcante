'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import React from 'react';

const youtubeUrls = [
  'https://www.youtube.com/shorts/_3RgBfR8rTQ',
  'https://www.youtube.com/shorts/Erp0YLbyiaA',
  'https://www.youtube.com/shorts/zuNg5oldzc4',
  'https://www.youtube.com/shorts/ixrkMRpDkew',
];

// Função para extrair o ID do vídeo do YouTube de diferentes formatos
const extractYoutubeId = (url) => {
  const regex = /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([\w-]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const VideoGallery = () => {
  const videoIds = youtubeUrls.map(extractYoutubeId).filter(id => id !== null);

  return (
    <section className="py-16 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800 mb-4">
            Vídeos
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-green-800">
            Conheça mais sobre nossos tratamentos
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Veja relatos e explicações em vídeo sobre como atuamos para melhorar sua saúde naturalmente.
          </p>
        </div>

        {/* Desktop (quatro lado a lado) */}
        <div className="hidden md:flex justify-between gap-4">
          {videoIds.map((id, index) => (
            <div key={index} className="w-1/4 aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${id}`}
                title={`Video ${index + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg"
              />
            </div>
          ))}
        </div>

        {/* Mobile (carrossel) */}
        <div className="md:hidden">
          <Swiper spaceBetween={16} slidesPerView={1.2} centeredSlides loop>
            {videoIds.map((id, index) => (
              <SwiperSlide key={index}>
                <div className="aspect-video w-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${id}`}
                    title={`Video ${index + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-lg"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;
