export class Chrono {
	now:number = 0;
	timerId: any = 0;
	started:boolean = false;
	
	chronoLabel:string = "";

	constructor(){

	}

	chrono():void{
		let me = this;

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
		}, 1000);
	}

	startTimer(): void {
		if (this.started==true) return;
		this.chrono();
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
