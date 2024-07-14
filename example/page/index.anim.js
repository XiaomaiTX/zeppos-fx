import { Fx } from "../../fx";
const Track_1 = [
	{
		props: {
			startTime: 1,
			duration: 1,
			fps: 1,
			fx_style: Fx.Styles.LINEAR,
			repeat: true,
		},
		func: (result) => {
			console.log("result1 ", result);
			return;
		},
		onStop: (result) => {
			return;
		},
	},
	{
		props: {
			startTime: 1,
			duration: 1,
			fps: 1,
			fx_style: Fx.Styles.LINEAR,
			repeat: true,
		},
		func: (result) => {
			console.log("result2 ", result);
			return;
		},
		onStop: (result) => {
			return;
		},
	},
];

export const AnimProfile = [Track_1];
