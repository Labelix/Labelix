#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["Labelix.WebAPI/Labelix.WebAPI.csproj", "Labelix.WebAPI/"]
COPY ["Labelix.Transfer/Labelix.Transfer.csproj", "Labelix.Transfer/"]
COPY ["Labelix.Contracts/Labelix.Contracts.csproj", "Labelix.Contracts/"]
COPY ["CommonBase/CommonBase.csproj", "CommonBase/"]
COPY ["Labelix.Logic/Labelix.Logic.csproj", "Labelix.Logic/"]
RUN dotnet restore "Labelix.WebAPI/Labelix.WebAPI.csproj"
COPY . .
WORKDIR "/src/Labelix.WebAPI"
RUN dotnet build "Labelix.WebAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Labelix.WebAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Labelix.WebAPI.dll"]