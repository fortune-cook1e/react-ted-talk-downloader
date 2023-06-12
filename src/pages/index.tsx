import { useRouter } from 'next/router';
import { BiAccessibility } from 'react-icons/bi';
import { Card, Avatar } from 'antd';
const { Meta } = Card;

const LINKS = [
  {
    url: 'ted',
    text: 'TED Talk',
  },
  {
    url: 'economist',
    text: 'Enonomist',
  },
];

function Home() {
  const router = useRouter();

  const cardClick = (url: string) => {
    router.push(url);
  };

  return (
    <main className="p-12 min-h-screen flex justify-center items-center">
      <div className="w-full h-full bg-white">
        <div className="flex flex-col items-center p-8">
          <div className="bg-black rounded-full mb-2 p-4">
            <BiAccessibility className="w-14 h-14  flex justify-center items-center text-white " />
          </div>
          <h1 className="font-bold text-lg">Welcome to English Talk Downloader</h1>
          <h3>Please choose your section</h3>
        </div>
        <div className="flex justify-center gap-5">
          {LINKS.map(l => {
            return (
              <Card
                onClick={() => cardClick(l.url)}
                key={l.url}
                className="w-[300px] font-bold cursor-pointer hover:bg-yellow-50"
              >
                <Meta
                  avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />}
                  title={l.text}
                ></Meta>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default Home;
