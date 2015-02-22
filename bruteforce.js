var Imgur = {
    fetch: function(num) {
        var self=this;
        self.total=num;
        self.done=0;
        self.failures=0;
        self.start=+new Date;

        $('#images').empty();
        for (var x = 0; x < num; x++) {
            self.hunt(function(id) {
                self.done++;
                $('#images').prepend("<li><a href='http://imgur.com/" + id + "'><img src='http://i.imgur.com/" + id + "s.png' height='200' width='200' /></a></li>");
                self.update();
            });
        }
    },
    update: function() {
        var interval=new Date-this.start;
        function speed(v) { return (~~(v/interval*1e5))/100; }
        $('#info').html((this.done<this.total?"Loading.. "+this.done+"/"+this.total+" ("+this.failures+" failures"+") ":"Done. ")+"["+speed(this.failures+this.done)+" req/s - "+speed(this.done)+" img/s]");
    },
    
    hunt: function(cb) {
        var self=this,
            id = self.random(5),
            img = new Image;
        self.update();
        img.src = "http://imgur.com/"+id+"s.png";
        img.onload = function() {
            if (img.width==198 && img.height==160) {
                // assume this is an imgur error image, and retry.
                fail();
            } else {
                cb(id);
            }
        }
        img.onerror = fail; // no escape.
        function fail() {
            self.failures++;
            self.update();
            self.hunt(cb);
        }
    },
    
    random: function(len) {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        return len?chars.charAt(~~(Math.random()*chars.length))+this.random(len-1):"";
    }
};

$('#random').bind('click', function(e) {
    Imgur.fetch(50);
});
