# docker-seqeulize-error

Docker와 sequelize 연결시 계속 해당 포트를 사용중이라는 에러가 발생합니다..!

그래서 `docker compose up` 이라는 명령어 대신

```
docker pull mysql
```

로 따로 mysql 이미지를 다운 받고,

```
docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=password -d -p 3306:3306 mysql:latest
```

이런식으로 직접 컨테이너를 실행시켜주려했는데도 똑같은 에러가 발생합니다..!

<img width="580" alt="스크린샷 2024-01-21 오전 10 08 00" src="https://github.com/brgndyy/docker-seqeulize-error/assets/109535991/f8214c45-28cc-4aae-b07e-0ad26bce9742">

위의 사진처럼, 포트를 삭제 후 3306포트를 조회하면 계속 해당 포트번호가 살아나는데, 이것과 연관있는지 모르겠습니다.

> 환경변수는 루트 경로에서 env라는 폴더를 만들어서 mysql.env 파일에 따로 담아주었는데 여기 레포엔 업로드하지 못했습니다..!

도커말고 로컬에서 실행하면 정상적으로 실행이 됩니다!
