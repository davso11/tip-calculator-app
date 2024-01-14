import { Title } from './components/title';
import { Calculator } from './components/calculator';

export function App() {
  return (
    <main>
      <div className="shell flex flex-col gap-y-10 pt-12 md:gap-y-24 md:px-6">
        <Title />
        <Calculator />
      </div>
    </main>
  );
}
