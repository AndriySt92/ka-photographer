import { useWindowSize } from '../../../hooks';
import { HoverCircles } from '../../';

const terms = [
  {
    title: 'Термін віддачі фото',
    subtitle: 'До 10 днів (в обробці — тільки найкращі кадри\nв моєму авторському стилі).',
  },
  {
    title: ' Термінова обробка (до 24 годин)',
    subtitle: '500 грн до обраного тарифу\nДоступна тільки за попередньою домовленістю.',
  },
  {
    title: ' Виїзд за місто',
    subtitle:
      'Зйомка за межами міста (де не курсує громадський транспорт)\nлише за умови організації або компенсації трансферу.',
  },
  {
    title: 'У вартість не входить:',
    subtitle:
      '— оренда студії\n— послуги візажиста, стиліста, перукаря\nАле за потреби — порекомендую перевірених майстрів,\nз якими я працюю',
  },
  {
    title: 'Питання — це нормально!',
    subtitle:
      'Я завжди зацікавлена в тому, щоб результат вийшов не просто\nкрасивим, а твоїм.\nТому не соромся питати про локації, образи, настрій\nчи саму ідею фотосесії — я з радістю допоможу!',
  },
];

const Terms = () => {
  const { width } = useWindowSize();

  const getMarginValue = () => {
    if (width > 2100) return 0;
    if (width > 1800) return (width - 1672) / 2;
    if (width > 1280) return (width - 1232) / 2;
    if (width > 1024) return (width - 976) / 2;

    return 0;
  };

  const marginValue = getMarginValue();
  return (
    <section className="relative bg-primary xl:pt-[48px] 2xl:pt-[60px]">
      <div className="container py-16 2xl:py-20">
        <div className="relative">
          <div className="space-y-6 xl:space-y-8 2xl:space-y-10">
            <h1 className="pointer-events-none relative z-40 w-full font-primary font-medium uppercase leading-[0.8] tracking-wide text-secondary xl:max-w-[66%] xl:text-[130px] 2xl:max-w-[60%] 2xl:text-[160px]">
              <p>Умови</p>
              <p className="text-right">Співпраці</p>
            </h1>

            <div className="pointer-events-none xl:space-y-3 xl:pt-20 2xl:mb-24 2xl:space-y-5">
              {terms.map((item, index) => {
                const isEven = (index + 1) % 2 === 0;

                return (
                  <div
                    key={item.title}
                    className={`xl:space-y-3 2xl:space-y-5 ${isEven ? 'text-right' : 'text-left'}`}
                  >
                    <div className="relative">
                      {/* Gradient overlay */}
                      <div
                        className="absolute z-10 h-full opacity-40"
                        style={{
                          left: !isEven ? 0 : '',
                          right: isEven ? 0 : '',
                          background: isEven
                            ? 'linear-gradient(270deg, #1a00ff 0%, #000 100%)'
                            : 'linear-gradient(90deg, #1a00ff 0%, #000 100%)',
                          marginLeft: !isEven ? `-${marginValue}px` : 0,
                          marginRight: isEven ? `-${marginValue}px` : 0,
                          width: `calc(40% + ${marginValue}px)`,
                        }}
                      ></div>

                      <h3 className="relative z-50 w-full font-primary uppercase leading-[0.77] text-secondary xl:text-3xl 2xl:text-5xl">
                        {item.title}
                      </h3>
                    </div>

                    <p className="relative z-40 font-primary uppercase text-secondary xl:text-lg 2xl:text-2xl">
                      {item.subtitle.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Concentric Circles */}
          <HoverCircles />
        </div>
      </div>
    </section>
  );
};

export default Terms;
