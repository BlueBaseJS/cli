import { format } from 'winston';
import notifier from 'node-notifier';
import { fromCore } from '../paths';

//////// Notify
const successIcon = fromCore('./assets/br-success.png');
const errorIcon = fromCore('./assets/br-failed.png');

// Ignore log messages if they have { private: true }
const notifyFormatter = format((info: any) => {

	const { notify, ...rest } = info;

	const icon = info.level === 'error' ? errorIcon : successIcon;

	if (notify === true) {
		notifier.notify({
			icon,
			message: info.message,
			title: info.label,
		});
	}

	return rest;
}) as any;

export default notifyFormatter;
