import Link from 'next/link';

export default function LegalPage() {
  return (
    <div className="mx-auto flex justify-center">
      <div className="max-w-3xl flex flex-col space-y-4 my-14 px-4 lg:px-10 text-neutral-700 dark:text-neutral-300">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 lg:text-4xl">
          Legal
        </h1>

        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 lg:text-2xl">
          Information according to &sect; 5 TMG
        </h2>
        <p>
          Kaumon Aung
          <br />
          Web Developer
          <br />
          Kaunstrasse 35
          <br />
          14163 Berlin
          <br />
          Germany
        </p>

        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 lg:text-2xl">
          Contact
        </h2>
        <p>
          Phone: +49 (0) 1520 2170230
          <br />
          Email: kaumon.business@gmail.com
        </p>

        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 lg:text-2xl">
          VAT ID
        </h2>
        <p>
          VAT identification number according to &sect; 27 a Umsatzsteuergesetz:
          <br />
          DE353962043
        </p>

        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 lg:text-2xl">
          Consumer dispute resolution/universal arbitration board
        </h2>
        <p>
          We are not willing or obliged to participate in dispute resolution
          proceedings before a consumer arbitration board.
        </p>

        <p>
          Source:
          <Link href="https://www.e-recht24.de">https://www.e-recht24.de</Link>
        </p>
      </div>
    </div>
  );
}
