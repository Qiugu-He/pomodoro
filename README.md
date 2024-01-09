## Pomodoro: Count-Down Timer
<img src="https://github.com/Qiugu-He/20-React-App/blob/master/01-Pomodoro/timer.png" alt="alt text" width="100%" height="100%">
This small app is primarily practiced react hooks by built a Count down timer

### startTimer: 
- The state (e.g. Timer state, Running state, and title) is stored in a variable by using useState.
- It used useRef to stored the previoues rendered time.
```java
  const [title, setTitle] = useState('Let the countdown begin!!!');
  const [timeLeft, setTimeLeft] = useState(15);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
```
- When the startTimer is invoked, it will keep count-down and app will rendering/updating for each sec.
```java
    intervalRef.current = setInterval(() => {
        setTimeLeft((timeLeft) => {
            if (timeLeft >= 1) return timeLeft - 1;
            resetTimer();
            return 0;
        });
    }, 1000);
```

### stopTimer:
```java
    function stopTimer() {
        if (intervalRef.current === null) return;

        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setTitle('Keep it up!');
        setIsRunning(false);
  }
```

### resetTimer:
```java
    function resetTimer(){
        clearInterval(intervalRef.current);
        setTitle("Ready to go anoter round?");
        setTimeLeft(15);
        setIsRunning(false);
    }
```

## How to Run :
- npm install<br>
- npm run
- npm build (For production)
