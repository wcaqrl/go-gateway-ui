import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import './message.css';

let add: () => void;

export const MessageContainer = () => {
	const [list, setList] = useState([]);
	const remove = (msg) => {
		setList((messages) => (messages.filter((item) => item.key !== msg.key)));
	}
	add = (msg, timeout) => {
		setList((messages) => {
			const obj = [...messages, msg];
			setTimeout(() => {
				remove(msg)
			}, timeout ? timeout : 3000)
			return obj;
		})
	}

	useEffect(() => {
		if (list.length > 10) {
			list.shift();
		}
	},[list])

	return (
		<>
			{
				list.map(({ text, key, type }) => (
					<div key={key} className={`message ${type}`}>
						<span className='icon' />
						<span>{text}</span>
					</div>
				))
			}
		</>
	);
}


const getId = () => {
	return (Math.random() * 1000).toFixed()
}

export const Message = {
	info: (text, timeout) => {
		add({
			text,
			key: getId(),
			type: 'info'
		}, timeout)
	},
	success: (text, timeout) => {
		add({
			text,
			key: getId(),
			type: 'success'
		}, timeout)
	},
	warn: (text, timeout) => {
		add({
			text,
			key: getId(),
			type: 'warn'
		}, timeout)
	},
	error: (text, timeout) => {
		add({
			text,
			key: getId(),
			type: 'error'
		}, timeout)
	}
}


// 挂载容器到页面
const createMessage = () => {
	let el = document.getElementById('#message-wrap');
	// 这一步是必要的的，因为在执行到这里的时候，页面还没有挂载，所以获取不到el节点
	if (!el) {
		el = document.createElement('div')
		el.className = 'message-wrap'
		el.id = 'message-wrap'
		document.body.append(el)
	}
	ReactDOM.render(<MessageContainer />, el);
}

createMessage();