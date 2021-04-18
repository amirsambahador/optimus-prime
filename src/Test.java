import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;

@WebServlet("/test.do")
public class Test extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setHeader("Access-Control-Allow-Origin",req.getHeader("origin"));
        resp.setHeader("Access-Control-Allow-Methods", "POST");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type");

        System.out.println("METHOD: "+req.getMethod());
        System.out.println("QUERY STRING: "+req.getQueryString());

        BufferedReader bufferedReader = req.getReader();
        int ascii = bufferedReader.read();
        String content="";
        while (ascii!=-1)
        {
            content+=(char) ascii;
            ascii = bufferedReader.read();
        }
        bufferedReader.close();
        System.out.println("REQUEST BODY: "+content);



        resp.getWriter().println("OK");
    }
}
