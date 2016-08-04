(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.thunkify = factory());
}(this, function () {
    
    /**
     * Wrap a regular callback `fn` as a thunk.
     *
     * @param {Function} fn
     * @return {Function}
     * @api public
     */
    
    function thunkify(fn){
        return function(){
            var args = new Array(arguments.length);
            var ctx = this;
            
            for(var i = 0; i < args.length; ++i) {
                args[i] = arguments[i];
            }
            
            return function(done){
                var called;
                
                args.push(function(){
                    if (called) return;
                    called = true;
                    done.apply(null, arguments);
                });
                
                try {
                    fn.apply(ctx, args);
                } catch (err) {
                    done(err);
                }
            }
        }
    };
    
    /**
     * Expose `thunkify()`.
     */
    return thunkify;
}))
