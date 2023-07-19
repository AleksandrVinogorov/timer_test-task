import React, { useState, useEffect } from 'react';

function App() {
  const [seconds, setSeconds] = useState('');
  const [value, setValue] = useState('')
  const [formattedDate, setFormattedDate] = useState('');

  const handleChangeInput = (e) => {
    setSeconds(e.target.value);
  };

  const createTimerAnimator = (time) => {
    if (!isNaN(time)) {
      const hours = Math.floor(time / 3600); // часы
      const minutes = Math.floor((time % 3600) / 60); // минуты
      const sec = time % 60; //секунды
      const formatted = `${hours} часов ${minutes} минут ${sec} секунд`;
      setFormattedDate(formatted);
      if (seconds !== '') {
        setValue(seconds)
      } // Сохраняем значение input в переменную value перед очищением поля 
      setSeconds(''); // Сброс значения input для очистки поля
    } else {
      setFormattedDate('Введите корректные данные');
    }
  };

  // устанавливаем таймер
  useEffect(() => {
    let intervalId;

    intervalId = setInterval(() => {
      setValue((prevSeconds) => {
        if (prevSeconds > 0) {
          const newSeconds = prevSeconds - 1;
          createTimerAnimator(newSeconds);
          return newSeconds;
        }
        else (clearInterval(intervalId))

      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };

  });

  return (
    <div className="App">
      <input
        className="App__input"
        type="text"
        onChange={handleChangeInput}
        value={seconds}
        placeholder="Seconds"
      />
      <button onClick={() => createTimerAnimator(seconds)}>Start</button>
      <br />
      <br />
      <span>{formattedDate}</span>

    </div>
  );
}

export default App;