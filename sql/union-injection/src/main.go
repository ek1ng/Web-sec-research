package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

type DateBaseService struct {
	Db *sql.DB
}

type Book struct {
	ID     int
	Name   string
	Number int
}

func (dbs *DateBaseService) Get(c *gin.Context) {
	id := c.Param("id")
	var books []Book
	query := fmt.Sprintf("SELECT * FROM books WHERE id = '%s'", id)
	rows, err := dbs.Db.Query(query)
	log.Println(rows)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}

	} else {
		defer rows.Close()
		for rows.Next() {
			var book Book
			err := rows.Scan(&book.ID, &book.Name, &book.Number)
			log.Println(book)
			if err == nil {
				books = append(books, book)
			}
		}
		log.Println(books)
		if books != nil {
			c.String(http.StatusOK, "Vidar-Team has %d books called %s", books[0].Number, books[0].Name)
		} else {
			c.String(http.StatusOK, "手写写不完了，就写个十几条吧，有空可以来协会看看到底有多少书捏～")
		}

	}
}

func initDb() *sql.DB {
	connStr := "book:Bl09m4Nag3rPa5sWOrd@tcp(challenge07_mysql:3306)/book"
	// 这里的challenge07_mysql是config.json里面的容器名字
	tryNew := 5
	for {
		db, err := sql.Open("mysql", connStr)
		if err != nil {
			log.Println(err)
			time.Sleep(5 * time.Second)
			tryNew -= 1
		} else if tryNew == 0 {
			panic("Failed to connect to MySQL")
		} else {
			return db
		}
	}
}

func setupRouter() *gin.Engine {
	db := initDb()
	r := gin.Default()
	service := DateBaseService{Db: db}
	r.GET("/", func(ctx *gin.Context) {
		ctx.String(http.StatusOK, "欢迎访问Vidar-Team图书管理系统！尝试访问/books/1看看？")
	})
	r.GET("/books/:id", service.Get)
	r.GET("/flag", func(ctx *gin.Context) {
		ctx.String(http.StatusOK, "Hint: Try Sql Injection")
	})
	return r
}

func main() {
	r := setupRouter()
	r.Run(":80")
}
