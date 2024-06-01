import React, {useEffect, useState} from 'react';
import { ClockWrapper } from './style';
import { TimeUtil } from "../../utils/time";

const Clock = (props) => {
	const timeUtil = new TimeUtil();
	const timeObj  = timeUtil.getDate();
	const [year, setYear]  = useState(timeObj.year || '');
	const [month, setMonth]  = useState(timeObj.month || '');
	const [day, setDay]  = useState(timeObj.day || '');
	const [hour, setHour]  = useState(timeObj.hour || '');
	const [minute, setMinute]  = useState(timeObj.minute || '');
	const [week, setWeek]  = useState(timeObj.week);
	const numMap  = {
		0: '&#xe615;',
		1: '&#xe622;',
		2: '&#xe623;',
		3: '&#xe60d;',
		4: '&#xe620;',
		5: '&#xe626;',
		6: '&#xe627;',
		7: '&#xe628;',
		8: '&#xe699;',
		9: '&#xe62a;'
	};
	const weekMap = {
		0: 'Sun',
		1: 'Mon',
		2: 'Tue',
		3: 'Wed',
		4: 'Thur',
		5: 'Fri',
		6: 'Sat',
		7: ''
	};

	useEffect(() => {
		const timer = setInterval(() => {
			let tmpTimeObj  = timeUtil.getDate();
			setYear(tmpTimeObj.year);
			setMonth(tmpTimeObj.month);
			setDay(tmpTimeObj.day);
			setHour(tmpTimeObj.hour);
			setMinute(tmpTimeObj.minute);
			setWeek(tmpTimeObj.week);
		}, 1000);
		return () => clearInterval(timer)
	}, [])

	return (
		<ClockWrapper>
			<span>{year}</span><span>-</span><span>{month}</span><span>-</span><span>{day}</span>
			&nbsp;&nbsp;
			<span>{hour}</span><span>:</span><span>{minute}</span>
			&nbsp;&nbsp;
			<span>{week !== 7 && weekMap[week]}</span>
		</ClockWrapper>
	);

	/*return (
		<ClockWrapper>
			<span>
				{
					!!year && year.split('').map((v, i) => {
						return <i className='iconfont' key={year + '-' + i}
								dangerouslySetInnerHTML={{__html: numMap[v]}}/>
					})
				}
			</span>
			<i className='iconfont '>&#xe618;</i>
			<span>
				{
					!!month && month.split('').map((v, i) => {
						return <i className='iconfont' key={month + '-' + i}
								  dangerouslySetInnerHTML={{__html: numMap[v]}}/>
					})
				}
			</span>
			<i className='iconfont '>&#xe618;</i>
			<span>
				{
					!!day && day.split('').map((v, i) => {
						return <i className='iconfont' key={day + '-' + i}
								  dangerouslySetInnerHTML={{__html: numMap[v]}}/>
					})
				}
			</span>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<span>
				{
					!!hour && hour.split('').map((v, i) => {
						return <i className='iconfont' key={hour + '-' + i}
								  dangerouslySetInnerHTML={{__html: numMap[v]}}/>
					})
				}
			</span>
			<i className='iconfont '>&#xe692;</i>
			<span>
				{
					!!minute && minute.split('').map((v, i) => {
						return <i className='iconfont' key={minute + '-' + i}
								  dangerouslySetInnerHTML={{__html: numMap[v]}}/>
					})
				}
			</span>
			<i className='iconfont '>&#xe692;</i>
			<span>
				{
					!!second && second.split('').map((v, i) => {
						return <i className='iconfont' key={second + '-' + i}
								  dangerouslySetInnerHTML={{__html: numMap[v]}}/>
					})
				}
			</span>
			&nbsp;&nbsp;&nbsp;&nbsp;
			<span>
				{week !== 7 && weekMap[week]}
			</span>
		</ClockWrapper>
	);*/
}

export default Clock;