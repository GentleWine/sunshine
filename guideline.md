# API guideline

### Introduction

​	This manual is devoted to help you get a clearer mind about how to use these urls.

### Authentication

### File

### Passage

| URL            | method |      parameter       | description                                                  |
| -------------- | ------ | :------------------: | ------------------------------------------------------------ |
| /article/user  | Get    | phone,type,page,size | To get specific user's article. phone is a user's phone number, type is the type chosen of articles, page represents which page number of results you intend to get(starts from 0),  size means the length of each page. |
| /article/reply | Get    |    phone,postname    | To get specific article comments. phone refers to user's phone number, postname refers to article files' prefix. |