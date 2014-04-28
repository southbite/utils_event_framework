module.exports = {
	listeners:{},
	removeListener:function(listenerName, eventName){
		var _this = this;
		if (_this.listeners[eventName] && _this.listeners[eventName][listenerName])
			delete _this.listeners[eventName][listenerName];
	},
	addListener:function(listenerName, eventName, handler){
		var _this = this;
		
		if (!_this.listeners[eventName])
			_this.listeners[eventName] = {};
		
		_this.listeners[eventName][listenerName] = handler;
	},
	emit:function(eventName, args){
		var _this = this;
		for (var listenerName in _this.listeners[eventName]){
			try{
				//console.log('args**');
				//console.log(args);
				//console.log(_this.listeners);
				//console.log(_this.listeners[eventName]);
				//console.log(_this.listeners[eventName][listenerName]);
				_this.listeners[eventName][listenerName].call(null, args);
			}catch(e){
				//console.log('FAILURE IN EMIT');
				//console.log(e);
				//throw e;
			}
		}
			
	},
	importEvents:function(eventHandlers){
		var _this = this;
		for (var eventName in eventHandlers){
			var eventListener = eventHandlers[eventName];
			_this.addListener(eventListener.listenerName, eventName, eventListener.handler);
		}
	}
}