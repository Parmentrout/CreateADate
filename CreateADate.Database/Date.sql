CREATE TABLE [dbo].[Date]
(
	[DateId] INT NOT NULL Identity PRIMARY KEY,
	[UserId] INT NOT NULL default 0,
	[DateToken] INT NOT NULL default 0,
	[Name] varchar(255) null,
	[Email] varchar(255) null,
	[CreatedDate] datetimeoffset null,
	[IsDemo] bit null default 0
)
