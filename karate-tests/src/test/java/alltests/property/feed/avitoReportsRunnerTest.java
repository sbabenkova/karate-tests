package alltests.property.feed;
import com.intuit.karate.junit5.Karate;


public class avitoReportsRunnerTest {
  @Karate.Test
  Karate avitoReports() {
    return Karate.run("avitoReports").relativeTo(getClass());
  }
}