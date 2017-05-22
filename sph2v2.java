/*sph2v2.java
 *1997/9/1
 *Suzuki,Tesuo
*2012
*Hironobu Nishimura
*/

import java.applet.*;
import java.awt.*;
import java.lang.Math;
import java.awt.BasicStroke;
import java.awt.Graphics2D;

public class sph2v2 extends Applet implements Runnable{
	Thread th=null;
	
	int n=2000;
	
	int i,j,r,h,s,p,q,wl;
	Image buffer;
	Dimension d;
	
	public void init(){
		d=size();
		buffer=createImage(d.width,d.height);
		r=0;
		p=00;
		s=0;
		h=50;/*WAVE sourse gap*/
		wl=20;
		q=100000;
		add(new Label("source"));
		CheckboxGroup cg0=new CheckboxGroup();
		add(new Checkbox("mono",cg0,true));
		add(new Checkbox("dual",cg0,false));
		add(new Label("phase"));
		CheckboxGroup cg1=new CheckboxGroup();
		add(new Checkbox("0",cg1,true));
		add(new Checkbox("180",cg1,false));
		add(new Label("wave length"));
		CheckboxGroup cg2=new CheckboxGroup();
		add(new Checkbox("1",cg2,true));
		add(new Checkbox("1.5",cg2,false));
		add(new Label("               speed"));
		CheckboxGroup cg3=new CheckboxGroup();
		add(new Checkbox("low",cg3,false));
		add(new Checkbox("high",cg3,false));
		add(new Checkbox("stop",cg3,true));
		
		
	}

	void drawToBuffer(){
		Graphics g=buffer.getGraphics();
		g.setColor(Color.white);
		g.clipRect(0,30,d.width,d.height-30);
		g.fillRect(0,30,d.width,d.height-30);
		BasicStroke stroke;
	Graphics2D g2 = (Graphics2D)g;
	stroke = new BasicStroke(2.7f); 
g2.setStroke(stroke); 

	for(i=0;i<n;i=i+wl){
		g.setColor(Color.red);		
		g.drawOval(d.width/2-i-r-h,d.height/2-i-r,2*(i+r),2*(i+r));
		}
		for(i=-wl/2;i<n;i=i+wl){
		g.setColor(new Color(0,255,255));		
		g.drawOval(d.width/2-i-r-h,d.height/2-i-r,2*(i+r),2*(i+r));
		}
		for(i=p*(-wl/2);i<n;i=i+wl){
		g.setColor(Color.red);		
		g.drawOval(q+d.width/2-i-r+h,d.height/2-i-r,2*(i+r),2*(i+r));
		}
		for(i=(-wl/2)+p*(wl/2);i<n;i=i+wl){
		g.setColor(new Color(0,255,255));		
		g.drawOval(q+d.width/2-i-r+h,d.height/2-i-r,2*(i+r),2*(i+r));
		}
	}
	void move (){
		r=r+s;
		if (r>=wl) r=0;		
	}

	
	public void start(){
		if (th==null){
			th=new Thread(this);
			th.start();
		}
	}
	public boolean action(Event ev,Object o){
		Checkbox ch=(Checkbox)ev.target;		
		if ("mono".equals (ch.getLabel())) q=10000;
		else if("dual".equals (ch.getLabel())){
		        q=0;
			}
		else if ("0".equals (ch.getLabel())) p=0;
		else if("180".equals (ch.getLabel())){
		        p=1;
			}
		else if("1".equals (ch.getLabel())){
			wl=20;
			}
		else if("1.5".equals (ch.getLabel())){
		        wl=30;
			}
		else if ("low".equals (ch.getLabel()))
			s=1;	   
		else if("high".equals (ch.getLabel()))
			s=2;	
		else if("stop".equals (ch.getLabel()))
			s=0;	 
		
			return true;
		}	
	

	public void run(){
		while(th !=null){
		move();
		drawToBuffer();		
		repaint();
		try {
				Thread.sleep(20);
			}
			catch (InterruptedException e){}
		}
	}
        public void update(Graphics g){
		paint(g);
	}

	public void paint (Graphics g){
		g.drawImage(buffer,0,0,this);
	}



	public void stop(){
		if (th!=null){
			th.stop();
			th=null;
		}
	}
}
