import { Observable, Subscription } from 'rxjs';

export class Chrono {
	public now:number = 0;
	public timer:Observable<number>;
	public subscriberTimer: Subscription;
	timerId: any = 0;
	started:boolean = false;
	
	chronoLabel:string = "00:00:00";

	constructor(){
		
	}

	chrono(): Observable<number> {
		let me = this;

		return this.timer = new Observable ((observer) => {
			this.timerId = setInterval(function (){
				me.now++;
				let remain = me.now;
				
				let hours: any = Math.floor(remain / 3600);
				remain -= hours * 3600;
	
				let mins: any = Math.floor(remain / 60);
				remain -= mins * 60;
	
				let secs: any = remain;
	
				if (hours < 10) hours = "0"+ hours;
				if (mins < 10) mins = "0"+mins;
				if (secs < 10) secs = "0"+secs;
	
				me.chronoLabel = hours +":"+ mins +":"+ secs;

				observer.next(me.now);
			}, 1000);
		});
	}

	setupStartTime(startTime: number):void{
		this.now = startTime;
		let remain = this.now;
			
		let hours: any = Math.floor(remain / 3600);
		remain -= hours * 3600;

		let mins: any = Math.floor(remain / 60);
		remain -= mins * 60;

		let secs: any = remain;

		if (hours < 10) hours = "0"+ hours;
		if (mins < 10) mins = "0"+mins;
		if (secs < 10) secs = "0"+secs;

		this.chronoLabel = hours +":"+ mins +":"+ secs;
	}

	startTimer(): Observable<number> {
		if (this.started==true) return;
		return this.chrono();
	}

	stopTimer():void {
		clearInterval(this.timerId);
		this.timerId = null;
	}

	continue(startDate: number):any {
		/*this.start = new Date(startDate) - this.diff;
		this.chrono();*/
	}
}
