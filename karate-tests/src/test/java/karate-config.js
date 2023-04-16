function fn() {

  var ptkUrl = java.lang.System.getenv('PTK_URL');
  karate.log('\'PTK_URL\' system property was:', ptkUrl);
  var dbUsername = java.lang.System.getenv('DB_USERNAME');
  karate.log('\'DB_USERNAME\' system property was:', dbUsername);
  var dbPassword = java.lang.System.getenv('DB_PASSWORD');
  karate.log('\'DB_PASSWORD\' system property was:', dbPassword);
  var dbUrl = java.lang.System.getenv('DB_URL');
  karate.log('\'DB_URL\' system property was:', dbUrl);

  var env = karate.env;
  karate.log("karate env is", env);
  karate.configure('logPrettyRequest', true);
  karate.configure('logPrettyResponse', true);
  karate.configure('printEnabled', true);
  karate.configure('connectTimeout', 30000);
  karate.configure('readTimeout', 30000);

  if (!env) {
    env = 'test'
  }

  var config = {
    env: env,
    ptkUrl: ptkUrl,
    dbUsername: dbUsername,
    dbPassword: dbPassword,
    dbUrl: dbUrl
  }
  if (env === 'test') {
    // Deprecated
    config.baseUrl = "http://localhost:8080";
    //config.baseUrl = "http://localhost:20000";
    config.ptkHost = "localhost";

    config.propertyServicePort = 20019;
    //config.propertyServicePort = 8082;
    config.propertyServiceBaseUrl = "http://" + config.ptkHost + ":" + config.propertyServicePort

    config.uarmServicePort = 20000;
    config.uarmServiceBaseUrl = "http://" + config.ptkHost + ":" + config.uarmServicePort

    config.contentDbConfig = {
      username: "postgres",
      password: "postgres",
      url: "jdbc:postgresql://localhost:30002/content",
      driverClassName: "org.postgresql.Driver"
    }

    config.configurationDbConfig = {
      username: "postgres",
      password: "postgres",
      url: "jdbc:postgresql://" + config.ptkHost + ":30000/configuration",
      driverClassName: "org.postgresql.Driver"
    }

    config.kafkaProperties = {
      "bootstrap.servers": "kafka01:9092,kafka02:9092,kafka03:9092,kafka04:9092,kafka05:9092",
      "key.deserializer": "org.apache.kafka.common.serialization.StringDeserializer",
      "value.deserializer": "org.apache.kafka.common.serialization.StringDeserializer",
      "group.id": "karate-kafka-default-consumer-group"
    }

    config.suggesterServicePort = 20031
    config.suggesterServiceBaseUrl = "http://" + config.ptkHost + ":" + config.suggesterServicePort
  }
  return config;
}