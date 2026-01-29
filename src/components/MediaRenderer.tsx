import { Volume2, Maximize2, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

export interface Media {
  type: "video" | "audio" | "image";
  url: string;
  thumbnail?: string;
}

interface MediaRendererProps {
  media: Media;
}

export const MediaRenderer = ({ media }: MediaRendererProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  switch (media.type) {
    case "video":
      return (
        <>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black flex items-center justify-center">
            <motion.video
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              controls
              poster={media.thumbnail}
              className="w-full h-full object-contain"
            >
              <source src={media.url} type="video/mp4" />
              Seu navegador não suporta vídeo HTML5.
            </motion.video>
            <button
              onClick={() => setIsFullscreen(true)}
              className="absolute top-[3%] left-[3%] flex aspect-square w-[8%] min-w-[28px] max-w-[40px] h-[8%] min-h-[28px] max-h-[40px] items-center justify-center rounded-lg bg-white/90 hover:bg-white transition-colors z-10"
              type="button"
            >
              <Maximize2 className="w-[60%] h-[60%] text-black" />
            </button>
          </div>

          {/* Fullscreen Modal - Portal */}
          {isFullscreen &&
            createPortal(
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4"
                  onClick={() => setIsFullscreen(false)}
                >
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-h-[90vh] flex items-center justify-center"
                  >
                    <video
                      controls
                      poster={media.thumbnail}
                      className="max-w-[95vw] max-h-[90vh] object-contain rounded-lg"
                      autoPlay
                    >
                      <source src={media.url} type="video/mp4" />
                      Seu navegador não suporta vídeo HTML5.
                    </video>
                    <button
                      onClick={() => setIsFullscreen(false)}
                      className="absolute top-4 right-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-all text-white"
                      type="button"
                    >
                      <X className="h-8 w-8" />
                    </button>
                  </motion.div>
                </motion.div>
              </AnimatePresence>,
              document.body
            )}
        </>
      );

    case "audio":
      return (
        <div className="w-full aspect-video rounded-lg bg-gradient-to-br from-pink-50 to-purple-50 p-6 flex flex-col items-center justify-center">
          <div className="flex flex-col gap-4 w-full max-w-md">
            <div className="flex items-center justify-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-200">
                <Volume2 className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">
                  Depoimento em Áudio
                </p>
              </div>
            </div>
            <audio
              controls
              className="w-full"
              style={{
                accentColor: "#9333ea",
              }}
            >
              <source src={media.url} type="audio/ogg" />
              <source src={media.url} type="audio/mpeg" />
              Seu navegador não suporta áudio HTML5.
            </audio>
          </div>
        </div>
      );

    case "image":
      return (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative w-full aspect-video overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center"
          >
            <img
              src={media.url}
              alt="Depoimento - Imagem"
              className="w-full h-full object-contain"
            />
            <button
              onClick={() => setIsFullscreen(true)}
              className="absolute top-[3%] left-[3%] flex aspect-square w-[8%] min-w-[28px] max-w-[40px] h-[8%] min-h-[28px] max-h-[40px] items-center justify-center rounded-lg bg-white/90 hover:bg-white transition-colors z-10"
              type="button"
            >
              <Maximize2 className="w-[60%] h-[60%] text-black" />
            </button>
          </motion.div>

          {/* Fullscreen Modal - Portal */}
          {isFullscreen &&
            createPortal(
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4"
                  onClick={() => setIsFullscreen(false)}
                >
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-h-[90vh] flex items-center justify-center"
                  >
                    <img
                      src={media.url}
                      alt="Depoimento - Imagem Expandida"
                      className="max-w-[95vw] max-h-[90vh] object-contain rounded-lg"
                    />
                    <button
                      onClick={() => setIsFullscreen(false)}
                      className="absolute top-4 right-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-all text-white"
                      type="button"
                    >
                      <X className="h-8 w-8" />
                    </button>
                  </motion.div>
                </motion.div>
              </AnimatePresence>,
              document.body
            )}
        </>
      );

    default:
      return null;
  }
};
