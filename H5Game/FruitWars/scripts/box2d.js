(function(){
	//将最常用的Box2D对象定义为快捷变量
	var b2Vec2 = Box2D.Common.Math.b2Vec2;
	var b2BodyDef = Box2D.Dynamics.b2BodyDef;
	var b2Body = Box2D.Dynamics.b2Body;
	var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
	var b2Fixture = Box2D.Dynamics.b2Fixture;
	var b2World = Box2D.Dynamics.b2World;
	var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
	var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
	var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
	
	var canvasWidth = $("#canvas").width();
	var canvasHeight = $("#canvas").height();
	
	var world;  //世界对象
	var scale = 30;  //画布上的30像素相当于Box2d世界中的1米
	
	//创建Box2d world对象，该对象将完成大部分物理运算
	function init() {
		//声明重力加速度为9.8m/s2, 方向向下
		var gravity = new b2Vec2(0, 9.8);
		//允许静止的物体进入休眠状态，休眠的物体不进行物理仿真运算
		var allowSleep = true;
		//创建Box2d世界对象
		world = new b2World(gravity, allowSleep);
	}
	
	//创建地面
	function createFloor() {
	    //物体(body)的定义对象，包含创建物体所需的所有属性
		var bodyDef = new b2BodyDef();
		//物体的类型为静态物体，静态物体不受重力或其他物体碰撞的影响
		bodyDef.type = b2Body.b2_staticBody;
		//物体的初始位置
		bodyDef.position.x = canvasWidth / 2 / scale;
		bodyDef.position.y = (canvasHeight - 30) / scale;
		
		//夹具(fixture)定义对象，用来向物体(body)添加形状等物理特性以实现碰撞检测
		var fixtureDef = new b2FixtureDef();
		//密度
		fixtureDef.density = 1.0;
		//摩擦系数
		fixtureDef.friction = 0.5;
        //弹性恢复系数
        fixtureDef.restitution = 0.2;
        
		//形状为多边形
        fixtureDef.shape = new b2PolygonShape();
        //外接矩形框
        fixtureDef.shape.SetAsBox(canvasWidth / 2 / scale, 10 / scale);		
	}
}()); 