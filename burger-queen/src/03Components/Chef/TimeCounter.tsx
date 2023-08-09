import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import { TimeCounterProps } from '../Interfaces';

dayjs.extend(duration);

export const TimeCounter: React.FC<TimeCounterProps> = ({dateEntry}) => {
  const [inicio, setInicio] = useState(dayjs(dateEntry));

  useEffect(() => {
    const interval = setInterval(() => {
      setInicio((prevInicio) => dayjs(prevInicio).add(1, 'milisecond'));
    }, 1000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, []);

  const calcularTiempoTranscurrido = () => {
    const ahora = dayjs();
    const diferencia = dayjs.duration(ahora.diff(inicio));

    const horas = String(diferencia.hours()).padStart(2, '0');
    const minutos = String(diferencia.minutes()).padStart(2, '0');
    const segundos = String(diferencia.seconds()).padStart(2, '0');

    return `${horas}:${minutos}:${segundos}`;
  };

  return (
    <div>
      <p>{calcularTiempoTranscurrido()}</p>
    </div>
  );
};
