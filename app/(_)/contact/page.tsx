"use client";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { Navigation } from "../../components/nav";
import { Triangle, Circle } from "lucide-react";
import Particles from "@/app/components/particles";
import {useState} from "react";
import { Inter } from 'next/font/google';

interface StateCodeMap {
	[key: string]: string;
}
const stateCodeToState: StateCodeMap = {
	'201': 'NJ',
	'202': 'DC',
	'203': 'CT',
	'205': 'AL',
	'206': 'WA',
	'207': 'ME',
	'208': 'ID',
	'209': 'CA',
	'210': 'TX',
	'212': 'NY',
	'213': 'CA',
	'214': 'TX',
	'215': 'PA',
	'216': 'OH',
	'217': 'IL',
	'218': 'MN',
	'219': 'IN',
	'220': 'OH',
	'224': 'IL',
	'225': 'LA',
	'228': 'MS',
	'229': 'GA',
	'231': 'MI',
	'234': 'OH',
	'239': 'FL',
	'240': 'MD',
	'248': 'MI',
	'251': 'AL',
	'252': 'NC',
	'253': 'WA',
	'254': 'TX',
	'256': 'AL',
	'260': 'IN',
	'262': 'WI',
	'267': 'PA',
	'269': 'MI',
	'270': 'KY',
	'272': 'PA',
	'276': 'VA',
	'281': 'TX',
	'283': 'OH',
	'301': 'MD',
	'302': 'DE',
	'303': 'CO',
	'304': 'WV',
	'305': 'FL',
	'307': 'WY',
	'308': 'NE',
	'309': 'IL',
	'310': 'CA',
	'312': 'IL',
	'313': 'MI',
	'314': 'MO',
	'315': 'NY',
	'316': 'KS',
	'317': 'IN',
	'318': 'LA',
	'319': 'IA',
	'320': 'MN',
	'321': 'FL',
	'323': 'CA',
	'325': 'TX',
	'330': 'OH',
	'331': 'IL',
	'334': 'AL',
	'336': 'NC',
	'337': 'LA',
	'339': 'MA',
	'346': 'TX',
	'347': 'NY',
	'351': 'MA',
	'352': 'FL',
	'360': 'WA',
	'361': 'TX',
	'364': 'KY',
	'385': 'UT',
	'386': 'FL',
	'401': 'RI',
	'402': 'NE',
	'404': 'GA',
	'405': 'OK',
	'406': 'MT',
	'407': 'FL',
	'408': 'CA',
	'409': 'TX',
	'410': 'MD',
	'412': 'PA',
	'413': 'MA',
	'414': 'WI',
	'415': 'CA',
	'417': 'MO',
	'419': 'OH',
	'423': 'TN',
	'424': 'CA',
	'425': 'WA',
	'430': 'TX',
	'432': 'TX',
	'434': 'VA',
	'435': 'UT',
	'440': 'OH',
	'442': 'CA',
	'443': 'MD',
	'464': 'IL',
	'469': 'TX',
	'470': 'GA',
	'475': 'CT',
	'478': 'GA',
	'479': 'AR',
	'480': 'AZ',
	'484': 'PA',
	'501': 'AR',
	'502': 'KY',
	'503': 'OR',
	'504': 'LA',
	'505': 'NM',
	'507': 'MN',
	'508': 'MA',
	'509': 'WA',
	'510': 'CA',
	'512': 'TX',
	'513': 'OH',
	'515': 'IA',
	'516': 'NY',
	'517': 'MI',
	'518': 'NY',
	'520': 'AZ',
	'530': 'CA',
	'531': 'NE',
	'534': 'WI',
	'539': 'OK',
	'540': 'VA',
	'541': 'OR',
	'551': 'NJ',
	'559': 'CA',
	'561': 'FL',
	'562': 'CA',
	'563': 'IA',
	'564': 'WA',
	'567': 'OH',
	'570': 'PA',
	'571': 'VA',
	'573': 'MO',
	'574': 'IN',
	'575': 'NM',
	'580': 'OK',
	'585': 'NY',
	'586': 'MI',
	'601': 'MS',
	'602': 'AZ',
	'603': 'NH',
	'605': 'SD',
	'606': 'KY',
	'607': 'NY',
	'608': 'WI',
	'609': 'NJ',
	'610': 'PA',
	'612': 'MN',
	'614': 'OH',
	'615': 'TN',
	'616': 'MI',
	'617': 'MA',
	'618': 'IL',
	'619': 'CA',
	'620': 'KS',
	'623': 'AZ',
	'626': 'CA',
	'628': 'CA',
	'629': 'TN',
	'630': 'IL',
	'631': 'NY',
	'636': 'MO',
	'641': 'IA',
	'646': 'NY',
	'650': 'CA',
	'651': 'MN',
	'657': 'CA',
	'660': 'MO',
	'661': 'CA',
	'662': 'MS',
	'667': 'MD',
	'669': 'CA',
	'678': 'GA',
	'681': 'WV',
	'682': 'TX',
	'684': 'AS',
	'701': 'ND',
	'702': 'NV',
	'703': 'VA',
	'704': 'NC',
	'706': 'GA',
	'707': 'CA',
	'708': 'IL',
	'712': 'IA',
	'713': 'TX',
	'714': 'CA',
	'715': 'WI',
	'716': 'NY',
	'717': 'PA',
	'718': 'NY',
	'719': 'CO',
	'720': 'CO',
	'724': 'PA',
	'725': 'NV',
	'727': 'FL',
	'731': 'TN',
	'732': 'NJ',
	'734': 'MI',
	'737': 'TX',
	'740': 'OH',
	'747': 'CA',
	'754': 'FL',
	'757': 'VA',
	'760': 'CA',
	'762': 'GA',
	'763': 'MN',
	'765': 'IN',
	'769': 'MS',
	'770': 'GA',
	'772': 'FL',
	'773': 'IL',
	'774': 'MA',
	'775': 'NV',
	'779': 'IL',
	'781': 'MA',
	'785': 'KS',
	'786': 'FL',
	'787': 'PR',
	'801': 'UT',
	'802': 'VT',
	'803': 'SC',
	'804': 'VA',
	'805': 'CA',
	'806': 'TX',
	'808': 'HI',
	'810': 'MI',
	'812': 'IN',
	'813': 'FL',
	'814': 'PA',
	'815': 'IL',
	'816': 'MO',
	'817': 'TX',
	'818': 'CA',
	'828': 'NC',
	'830': 'TX',
	'831': 'CA',
	'832': 'TX',
	'843': 'SC',
	'845': 'NY',
	'847': 'IL',
	'848': 'NJ',
	'850': 'FL',
	'856': 'NJ',
	'857': 'MA',
	'858': 'CA',
	'859': 'KY',
	'860': 'CT',
	'862': 'NJ',
	'863': 'FL',
	'864': 'SC',
	'865': 'TN',
	'870': 'AR',
	'872': 'IL',
	'878': 'PA',
	'901': 'TN',
	'903': 'TX',
	'904': 'FL',
	'906': 'MI',
	'907': 'AK',
	'908': 'NJ',
	'909': 'CA',
	'910': 'NC',
	'912': 'GA',
	'913': 'KS',
	'914': 'NY',
	'915': 'TX',
	'916': 'CA',
	'917': 'NY',
	'918': 'OK',
	'919': 'NC',
	'920': 'WI',
	'925': 'CA',
	'928': 'AZ',
	'929': 'NY',
	'930': 'IN',
	'931': 'TN',
	'934': 'NY',
	'936': 'TX',
	'937': 'OH',
	'938': 'AL',
	'939': 'PR',
	'940': 'TX',
	'941': 'FL',
	'947': 'MI',
	'949': 'CA',
	'951': 'CA',
	'952': 'MN',
	'954': 'FL',
	'956': 'TX',
	'959': 'CT',
	'970': 'CO',
	'971': 'OR',
	'972': 'TX',
	'973': 'NJ',
	'978': 'MA',
	'979': 'TX',
	'980': 'NC',
	'984': 'NC',
	'985': 'LA',
	'989': 'MI',
};


const inter = Inter({ subsets: ['latin'] })


export default function Contact() {

	const [phoneNumber, setPhoneNumber] = useState('');
	const [validNumber, setValidNumber] = useState(true);
	const handlePhoneNumberChange = (event:any) => {
		let input = event.target.value;

		// Only keep the numbers from the input.
		input = input.replace(/[^\d]/g, '');

		if (input.length < 4) {
			setPhoneNumber(input);
		} else if (input.length < 7) {
			setPhoneNumber(`${input.slice(0, 3)}-${input.slice(3)}`);
		} else {
			// Limit the input length to 10 digits (plus the hyphen).
			setPhoneNumber(`${input.slice(0, 3)}-${input.slice(3, 6)}-${input.slice(6, 10)}`);
		}

		// Check if the input starts with a valid state code.
		if (stateCodeToState[input.slice(0, 3)]) {
			setValidNumber(true);
		} else {
			setValidNumber(false);
		}
	};


	const handleSubmit = (event:any) => {
		event.preventDefault();
		if (!stateCodeToState[phoneNumber.substring(0, 3)]) {
			// Handle invalid state code here...
		} else if (phoneNumber.length !== 10) {
			// Handle invalid length here...
		} else {
			// Handle valid submission here...
		}
	};

	function formatPhoneNumber(phoneNumber:string) {
		if (phoneNumber.length <= 3) {
			return phoneNumber;
		} else if (phoneNumber.length === 4) {
			return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
		} else {
			return phoneNumber.includes("-") ? phoneNumber : `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
		}
	}

	return (
			// <div className='flex w-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black'>
			// <Particles
			// 	className="absolute inset-0 -z-10 animate-fade-in-2"
			// 	quantity={100}/>
			<div className="container mx-auto p-40 flex min-h-screen flex-col items-center justify-center px-4 animate-fade-in-2">
				<h2 className={`${inter.className} font-bold text-3xl text-white`}>Subscribe</h2>
				<div className="flex w-full max-w-md justify-center">
					<form action="#" method="post" className={`${inter.className} space-y-6 pt-8`} onSubmit={handleSubmit}>
						<div>
							<input
								id="email"
								type="email"
								required
								className="w-full rounded-xl bg-zinc-900 text-2xl font-md text-zinc-200 border-zinc-500 px-3 py-2 placeholder-zinc-800"
								inputMode={'email'}
								placeholder="yourmail@domain.com" // added placeholder
							/>
						</div>
						<div className="relative">
							<div className="relative">
								<input
									id="phone"
									type="tel"
									required
									inputMode={'tel'}
									pattern="\d*"
									className="w-full rounded-xl text-2xl bg-zinc-900 text-zinc-200 border-zinc-500 px-3 py-2 placeholder-zinc-800"
									value={formatPhoneNumber(phoneNumber)}
									onChange={handlePhoneNumberChange}
									maxLength={12}
									placeholder="123-456-7890" // added placeholder
								/>
								{phoneNumber && <span className="absolute inset-y-0 right-0 flex items-center text-zinc-400 justify-center pr-2">{stateCodeToState[phoneNumber.slice(0, 3)] || ""}</span>}
							</div>
						</div>


						{/*<div>*/}
						{/*	<label htmlFor="email" className="text-zinc-500 block mb-2">*/}
						{/*		Email*/}
						{/*	</label>*/}
						{/*	<input*/}
						{/*		id="email"*/}
						{/*		type="email"*/}
						{/*		required*/}
						{/*		className="w-full rounded-xl bg-zinc-900 text-zinc-200 border-zinc-500 px-3 py-2"*/}
						{/*		inputMode={'email'}*/}
						{/*	/>*/}
						{/*</div>*/}
						{/*<div className="relative">*/}
						{/*	<label htmlFor="phone" className="text-zinc-500 block mb-2">*/}
						{/*		Phone Number*/}
						{/*	</label>*/}
						{/*	<div className="relative">*/}
						{/*		<input*/}
						{/*			id="phone"*/}
						{/*			type="tel"*/}
						{/*			required*/}
						{/*			inputMode={'tel'}*/}
						{/*			pattern="\d*"*/}
						{/*			className="w-full rounded-xl bg-zinc-900 text-zinc-200 border-zinc-500 px-3 py-2"*/}
						{/*			value={formatPhoneNumber(phoneNumber)}*/}
						{/*			onChange={handlePhoneNumberChange}*/}
						{/*			maxLength={12}*/}
						{/*		/>*/}
						{/*		{phoneNumber && <span className="absolute inset-y-0 right-0 flex items-center text-zinc-400 justify-center pr-2">{stateCodeToState[phoneNumber.slice(0, 3)] || ""}</span>}*/}
						{/*	</div>*/}
						{/*</div>*/}
						{!validNumber && (
							<p className="text-xs text-red-600 text-center">
								Please enter a valid US Phone Number.
							</p>
						)}
						<div className="flex justify-center">
							<button type="submit" className="rounded-md bg-zinc-900 px-4 py-2 text-zinc-400 hover:text-zinc-200 duration-500 hover:shadow-emerald-glow shadow-lg backdrop-blur-2xl">
								Submit
							</button>
						</div>

						{/*<div className="flex justify-center">*/}
						{/*	<button type="submit" className="rounded-md bg-zinc-900 px-4 py-2 text-zinc-400 hover:text-zinc-200 duration-500 hover:shadow-emerald-900 shadow-lg backdrop-blur-2xl">*/}
						{/*		Submit*/}
						{/*	</button>*/}
						{/*</div>*/}
					</form>
				</div>
				<p className="text-center text-xs text-zinc-500 mt-8 ph-4">
					By providing your email and phone number, you agree to receive updates about the progress of the website, the agency, intake, starting dates, and more.
				</p>
			</div>
		// </div>
	);
}
