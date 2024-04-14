import { genEnvTypeDef } from 'gen-env-type-def';

const main = () => {
	genEnvTypeDef([
		{
			inDir: '.',
			envType: 'import.meta.env',
		},
	]);
};

main();
