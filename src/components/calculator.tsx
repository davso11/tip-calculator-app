import { useEffect, useRef, useState } from 'react';
import { DollarSign, User } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { tips } from '../constants/tips';

export function Calculator() {
  const [bill, setBill] = useState<number | ''>('');
  const [tipRate, setTipRate] = useState(0);
  const [customTipRate, setCustomTipRate] = useState<number | ''>('');
  const [people, setPeople] = useState<number | ''>('');
  const [total, setTotal] = useState<number | null>(null);
  const [tipAmount, setTipAmount] = useState<number | null>(null);
  const personInputRef = useRef<HTMLInputElement>(null);
  const [personInputError, setPersonInputError] = useState<string>();
  const isPersonZero = people === 0;

  const billChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let stringValue = e.target.value;

    // reset bill if it's empty
    if (stringValue.length <= 0) {
      return setBill('');
    }

    // TODO: remove leading zeros

    const value = parseFloat(stringValue);

    if (isNaN(value)) {
      return;
    }

    // remove trailing zeros to a number
    setBill(value);
  };

  const customTipRateChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let stringValue = e.target.value;

    // reset if it's empty
    if (stringValue.length <= 0) {
      setCustomTipRate('');
      return;
    }

    // remove leading zeros
    stringValue = stringValue.replace(/^0+/, '');
    const value = parseFloat(stringValue);

    // if not a number
    if (isNaN(value)) {
      return;
    }

    setTipRate(0);
    setCustomTipRate(value);
  };

  const peopleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonInputError('');

    let stringValue = e.target.value;

    // reset to 0 if it's empty
    if (stringValue.length <= 0) {
      return setPeople('');
    }

    // TODO: remove leading zeros
    // stringValue = stringValue.replace(/^0+/, '');

    const value = parseFloat(stringValue);

    if (isNaN(value)) {
      return;
    }

    if (value === 0) {
      setPersonInputError("Can't be zero");
      personInputRef.current?.focus();
    }

    setPeople(value);
  };

  const calculate = () => {
    if (!bill || !people || (!tipRate && !customTipRate)) {
      return;
    }

    // if person is zero, don't calculate
    if (isPersonZero) {
      return;
    }

    const tipRateValue = customTipRate || tipRate;
    const tipAmount = (bill * tipRateValue) / 100;
    const total = bill + tipAmount;
    const tipAmountPerPerson = tipAmount / people;
    const totalPerPerson = total / people;

    setTipAmount(+tipAmountPerPerson.toFixed(2));
    setTotal(+totalPerPerson.toFixed(2));
  };

  const reset = () => {
    setBill('');
    setTipRate(0);
    setCustomTipRate('');
    setPeople('');
    setTotal(null);
    setTipAmount(null);
  };

  useEffect(() => {
    if (!bill || !people || (!tipRate && !customTipRate)) {
      setTipAmount(null);
      setTotal(null);
    } else {
      calculate();
    }
  }, [bill, people, tipRate, customTipRate]);

  return (
    <div className="calculator flex w-full flex-col gap-10 md:flex-row md:gap-14">
      <div className="space-y-10">
        <Input
          id="bill"
          label="Bill"
          Icon={DollarSign}
          value={bill}
          onChange={billChangeHandler}
        />
        <div className="space-y-4">
          <h2>Select Tip %</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {tips.map(({ id, value }) => (
              <Button
                key={id}
                className={`grow basis-44 ${!!tipRate && tipRate === value && 'bg-primary text-primary-dark'}`}
                onClick={() => {
                  setTipRate(value);
                  setCustomTipRate('');
                }}
              >
                {value}%
              </Button>
            ))}
            <Input
              type="number"
              placeholder="Custom"
              value={customTipRate}
              onChange={customTipRateChangeHandler}
            />
          </div>
        </div>

        <Input
          id="people"
          label="Number of People"
          Icon={User}
          value={people}
          onChange={peopleChangeHandler}
          ref={personInputRef}
          error={personInputError}
        />
      </div>

      <div className="flex w-full flex-col rounded-3xl bg-primary-dark px-10 pb-10 pt-14">
        <div className="mb-10 space-y-8">
          <div className="flex justify-between gap-x-4">
            <div>
              <h3 className="text-white">Tip Amount</h3>
              <div className="space-x-3 text-neutral">
                <span>/</span>
                <span>person</span>
              </div>
            </div>

            <div className="flex items-center text-primary">
              <DollarSign
                strokeWidth={3}
                className="md:h-8 md:w-8"
              />
              <span className="text-4xl md:text-5xl">
                {tipAmount ? tipAmount : '0.00'}
              </span>
            </div>
          </div>

          <div className="flex justify-between gap-x-4">
            <div>
              <h3 className="text-white">Total</h3>
              <div className="space-x-3 text-neutral">
                <span>/</span>
                <span>person</span>
              </div>
            </div>

            <div className="flex items-center text-primary">
              <DollarSign
                strokeWidth={3}
                className="md:h-8 md:w-8"
              />
              <span className="text-4xl md:text-5xl">
                {total ? total : '0.00'}
              </span>
            </div>
          </div>
        </div>

        <Button
          className="mt-auto w-full bg-primary text-primary-dark"
          onClick={reset}
        >
          RESET
        </Button>
      </div>
    </div>
  );
}
