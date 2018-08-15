function pluralize(time, label) {
	if (time === 1) {
		return time + label
	}
	return time + label + 's'
}

export function timeAgo(time) {
	const between = Date.now() / 1000 - Number(time)
	if (between < 3600) {
		return pluralize(~~(between / 60), ' minute')
	} else if (between < 86400) {
		return pluralize(~~(between / 3600), ' hour')
	} else {
		return pluralize(~~(between / 86400), ' day')
	}
}

export function parseTime(time, cFormat) {
	if (time + '' === 'null') {
		return
	}
	if (arguments.length === 0) {
		return null
	}
	if ((time + '').length === 10) {
		time = +time * 1000
	}

	const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
	let date
	if (typeof time === 'object') {
		date = time
	} else {
		date = new Date(parseInt(time))
	}
	const formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay()
	}
	const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
		let value = formatObj[key]
		if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
		if (result.length > 0 && value < 10) {
			value = '0' + value
		}
		return value || 0
	})
	return time_str
}

export function formatTime(time, option) {
	time = +time * 1000
	const d = new Date(time)
	const now = Date.now()

	const diff = (now - d) / 1000

	if (diff < 30) {
		return '刚刚'
	} else if (diff < 3600) { // less 1 hour
		return Math.ceil(diff / 60) + '分钟前'
	} else if (diff < 3600 * 24) {
		return Math.ceil(diff / 3600) + '小时前'
	} else if (diff < 3600 * 24 * 2) {
		return '1天前'
	}
	if (option) {
		return parseTime(time, option)
	} else {
		return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
	}
}

/* 数字 格式化*/
export function nFormatter(num, digits) {
	const si = [
		{
			value: 1E18,
			symbol: 'E'
		},
		{
			value: 1E15,
			symbol: 'P'
		},
		{
			value: 1E12,
			symbol: 'T'
		},
		{
			value: 1E9,
			symbol: 'G'
		},
		{
			value: 1E6,
			symbol: 'M'
		},
		{
			value: 1E3,
			symbol: 'k'
		}
  ]
	for (let i = 0; i < si.length; i++) {
		if (num >= si[i].value) {
			return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
		}
	}
	return num.toString()
}

export function html2Text(val) {
	const div = document.createElement('div')
	div.innerHTML = val
	return div.textContent || div.innerText
}

export function toThousandslsFilter(num) {
	return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

export function pass_time(source) {
	if (source === '--' || !source) {
		return source
	}
	var passDate = new Date(source).getTime();
	var nowDate = Date.now();
	var date3 = nowDate - passDate;
	//计算出相差天数
	var leave0 = date3 % (24 * 3600 * 1000 * 365);
	var year = Math.floor(date3 / (24 * 3600 * 1000 * 365));
	var month = Math.floor(leave0 / (24 * 1000 * 3600 * 30));
	return (year === 0 ? "anos" : year + 'anos') + (month === 0 ? "mesês" : month + 'mesês')
}

export function language_stauts(value) {
	switch (value) {
		case "unknow":
			return "Error"
		case "delivered":
			return "Entregue"
		case "cancelled":
			return "Cancelado"
		case "posted":
			return "Expedido"
		case "paid":
			return "Aprovado"
		case "noProduct":
			return "NoProductos"
		case "complaint":
			return "complaint"
		case "confirmed":
			return "NF-e emitido"
		case "packaged":
			return "ncluido"
		case "shipping":
			return "Emtransito"
		default:
			return "暂未翻译"
	}
}

export function select_label(value) {
	switch (value) {
		case "Error":
			return "unknow"
		case "Erro":
			return "complaint"
		case "Entregue":
			return "delivered"
		case "Cancelado":
			return "cancelled"
		case "Expedido":
			return "posted"
		case "Aprovado":
			return "paid"
		case "NoProductos":
			return "noProduct"
		case "complaint":
			return "complaint"
		case "NF-e emitido":
			return "confirmed"
		case "ncluido":
			return "packaged"
		case "Emtransito":
			return "shipping"
		case "Retirada":
			return "printed"
		case "Postados":
			return "station"
		case "EmTrânsito":
			return "shipping"
		default:
			return "暂未翻译"
	}
}
