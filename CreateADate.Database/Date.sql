CREATE TABLE [dbo].[Date]
(
	[DateId] INT NOT NULL Identity PRIMARY KEY,
	[UserId] INT NOT NULL,
	[Name] varchar(255) null,
	[CreatedDate] datetimeoffset null,
	[IsDemo] bit null default 0
)
