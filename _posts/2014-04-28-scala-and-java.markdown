---
layout: post
title:  "Using Scala and Java together with Maven"
date:   2014-04-28 10:00:00
comments: true
categories: scala maven java
---

It's really super easy to start using Scala in your Java project, at least if you're using Maven. Here's how:


# Change src/main/scala

First, create the src/main/scala directory inside your project. Don't forget to always add Scala source files - and only Scala source files - there. Maven doesn't like it when you mix Java and Scala in the same directory!

# Change pom.xml

The following pom.xml file is a minimal pom after the changes. I've added the reference to the Scala repository, the dependency to the Scala libs and the Scala build plugin.

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>br.com.example.tests</groupId>
    <artifactId>scala-tests</artifactId>
    <version>0.0.1-SNAPSHOT</version>

    <repositories>
        <repository>
            <id>scala-tools.org</id>
            <name>Scala-tools Maven2 Repository</name>
            <url>https://oss.sonatype.org/content/groups/scala-tools/</url>
        </repository>
    </repositories>

    <dependencies>
        <dependency>
            <groupId>org.scala-lang</groupId>
            <artifactId>scala-library</artifactId>
            <version>2.11.0</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.scala-tools</groupId>
                <artifactId>maven-scala-plugin</artifactId>
                <version>2.15.2</version>
                <executions>

                    <execution>
                        <id>compile</id>
                        <goals>
                            <goal>compile</goal>
                        </goals>
                        <phase>compile</phase>
                    </execution>
                    <execution>
                        <id>test-compile</id>
                        <goals>
                            <goal>testCompile</goal>
                        </goals>
                        <phase>test-compile</phase>
                    </execution>
                    <execution>
                        <phase>process-resources</phase>
                        <goals>
                            <goal>compile</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
</project>
{% endhighlight %}

Okay, now you can include Scala source inside your project! Let's do a quick test. Create the file Hello.scala with the following content inside src/main/scala:

{% highlight scala %}
object Hello {
  val MESSAGE: String = "Hello, World!"
}
class Hello {
  def say(msg: String) = println(msg)
}
{% endhighlight %}

Now, inside src/main/java, create the file Say.java with the contents:

{% highlight java %}
public class Say {
    public static void main(String[] args) {
        new Hello().say(Hello.MESSAGE());
    }
}
{% endhighlight %}

If you run the Say class, you'll see the infamous "Hello, World!" message.
